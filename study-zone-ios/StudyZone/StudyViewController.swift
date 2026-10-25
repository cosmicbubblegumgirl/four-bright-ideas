import UIKit
import WebKit

private final class WeakMessages: NSObject, WKScriptMessageHandler {
    weak var receiver: StudyViewController?
    init(_ receiver: StudyViewController) { self.receiver = receiver }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) { receiver?.receive(message) }
}

final class StudyViewController: UIViewController, WKNavigationDelegate, WKUIDelegate {
    private var web: WKWebView!
    private let localContent = LocalContent()
    private let home = URL(string: "studyzone://localhost/index.html#home")!
    private let website = URL(string: "https://cosmicbubblegumgirl.github.io/four-bright-ideas/study-zone/")!
    private var exportURL: URL?

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Study Zone"
        view.backgroundColor = UIColor(red: 1, green: 0.976, blue: 0.941, alpha: 1)
        navigationController?.navigationBar.tintColor = UIColor(red: 0.129, green: 0.310, blue: 0.255, alpha: 1)
        navigationItem.leftBarButtonItem = UIBarButtonItem(image: UIImage(systemName: "chevron.left"), style: .plain, target: self, action: #selector(back))
        let configuration = WKWebViewConfiguration()
        configuration.setURLSchemeHandler(localContent, forURLScheme: "studyzone")
        configuration.allowsInlineMediaPlayback = true
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = false
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        configuration.userContentController.add(WeakMessages(self), name: "studyZone")
        configuration.userContentController.addUserScript(WKUserScript(source: "window.print=function(){window.webkit.messageHandlers.studyZone.postMessage({action:'print'})};", injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        web = WKWebView(frame: .zero, configuration: configuration)
        web.navigationDelegate = self
        web.uiDelegate = self
        web.allowsBackForwardNavigationGestures = true
        web.translatesAutoresizingMaskIntoConstraints = false
        web.isOpaque = false
        web.backgroundColor = view.backgroundColor
        view.addSubview(web)
        NSLayoutConstraint.activate([
            web.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            web.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            web.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            web.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
        setMenu()
        web.load(URLRequest(url: home))
    }

    private func setMenu() {
        let links: [(String, String)] = [
            ("LinkedIn · Simoné Govender", "https://www.linkedin.com/in/simone-govender-dev/"),
            ("Developer portfolio", "https://cosmicbubblegumgirl.github.io/simone-cosmic-portfolio/"),
            ("Interactive portfolio", "https://cosmicbubblegumgirl.github.io/simone-cosmic-portfolio-game/"),
            ("GitHub", "https://github.com/cosmicbubblegumgirl")
        ]
        var actions: [UIMenuElement] = [
            UIAction(title: "My home base", image: UIImage(systemName: "house")) { [weak self] _ in guard let self = self else { return }; self.web.load(URLRequest(url: self.home)) },
            UIAction(title: "About Study Zone", image: UIImage(systemName: "info.circle")) { [weak self] _ in self?.web.evaluateJavaScript("location.hash='about'", completionHandler: nil) },
            UIAction(title: "Open website", image: UIImage(systemName: "safari")) { [weak self] _ in guard let self = self else { return }; self.open(self.website) }
        ]
        actions.append(UIMenu(title: "Developed by Simoné Govender", children: links.map { label, address in
            UIAction(title: label) { [weak self] _ in if let url = URL(string: address) { self?.open(url) } }
        }))
        navigationItem.rightBarButtonItem = UIBarButtonItem(image: UIImage(systemName: "ellipsis.circle"), menu: UIMenu(title: "Study Zone · Founded by Godfrey", children: actions))
    }
    @objc private func back() { if web.canGoBack { web.goBack() } else { web.evaluateJavaScript("location.hash='home'", completionHandler: nil) } }
    private func open(_ url: URL) {
        guard let scheme = url.scheme?.lowercased(), ["https", "http", "mailto", "tel", "whatsapp"].contains(scheme) else { return }
        UIApplication.shared.open(url, options: [:])
    }
    func receive(_ message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame, message.frameInfo.securityOrigin.protocol == "studyzone",
              message.frameInfo.securityOrigin.host == "localhost",
              let payload = message.body as? [String: Any], let action = payload["action"] as? String else { return }
        if action == "print" {
            let controller = UIPrintInteractionController.shared
            let info = UIPrintInfo(dictionary: nil)
            info.jobName = "Study Zone worksheet"
            info.outputType = .general
            controller.printInfo = info
            controller.printFormatter = web.viewPrintFormatter()
            controller.present(animated: true, completionHandler: nil)
        } else if action == "export" {
            guard let encoded = payload["data"] as? String, encoded.count <= 28_000_000,
                  let data = Data(base64Encoded: encoded), data.count <= 20 * 1024 * 1024 else {
                showError("This export is too large. Please use the website to export it."); return
            }
            let requested = (payload["name"] as? String) ?? "Study-Zone-Export.json"
            let name = requested.components(separatedBy: CharacterSet(charactersIn: "/\\:\n\r")).joined(separator: "_")
            guard !name.isEmpty else { return }
            do {
                let folder = FileManager.default.temporaryDirectory.appendingPathComponent("StudyZoneExports", isDirectory: true)
                try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
                let destination = folder.appendingPathComponent(String(name.suffix(160)))
                try data.write(to: destination, options: [.atomic, .completeFileProtection])
                exportURL = destination
                let share = UIActivityViewController(activityItems: [destination], applicationActivities: nil)
                share.popoverPresentationController?.barButtonItem = navigationItem.rightBarButtonItem
                share.completionWithItemsHandler = { _, _, _, _ in try? FileManager.default.removeItem(at: destination) }
                present(share, animated: true)
            } catch { showError("The file could not be exported. Please try again.") }
        }
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard ProcessInfo.processInfo.arguments.contains("--smoke-test"), !smokeStarted else { return }
        smokeStarted = true
        smokeStep(0, results: [:])
    }
    private var smokeStarted = false
    private func smokeStep(_ index: Int, results: [String: Bool]) {
        let checks: [(String, String, String)] = [
            ("home", "home", "document.querySelector('#main h1')?.textContent.includes('Getting your') === false"),
            ("subjects", "subjects", "document.querySelectorAll('.subject-card').length > 30"),
            ("developer", "about", "document.querySelector('#main').textContent.includes('Simoné Govender') && !!document.querySelector('#main a[href=\"https://www.linkedin.com/in/simone-govender-dev/\"]')"),
            ("contact", "connect", "document.querySelector('#main').textContent.includes('Godfrey') && !!document.querySelector('#main a[href^=\"https://wa.me/27671228990\"]')")
        ]
        guard index < checks.count else {
            let output = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("smoke-test.json")
            if let data = try? JSONSerialization.data(withJSONObject: results) { try? data.write(to: output) }
            return
        }
        let check = checks[index]
        web.evaluateJavaScript("location.hash='\(check.1)'", completionHandler: nil)
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { [weak self] in
            guard let self = self else { return }
            self.web.evaluateJavaScript(check.2) { result, error in
                var next = results
                next[check.0] = error == nil && (result as? Bool == true)
                self.smokeStep(index + 1, results: next)
            }
        }
    }
    private func showError(_ text: String) {
        let alert = UIAlertController(title: "Study Zone", message: text, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
        if url.scheme == "studyzone", url.host == "localhost" { decisionHandler(.allow); return }
        if navigationAction.targetFrame?.isMainFrame == false { decisionHandler(.allow); return }
        decisionHandler(.cancel)
        open(url)
    }
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url { open(url) }
        return nil
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        if (error as NSError).code != NSURLErrorCancelled { showError("The study page could not open. Return to My home base from the menu and try again.") }
    }
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = UIAlertController(title: "Study Zone", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler() })
        present(alert, animated: true)
    }
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let alert = UIAlertController(title: "Study Zone", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(false) })
        alert.addAction(UIAlertAction(title: "Continue", style: .default) { _ in completionHandler(true) })
        present(alert, animated: true)
    }
    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        let alert = UIAlertController(title: "Study Zone", message: prompt, preferredStyle: .alert)
        alert.addTextField { $0.text = defaultText }
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(nil) })
        alert.addAction(UIAlertAction(title: "Continue", style: .default) { _ in completionHandler(alert.textFields?.first?.text) })
        present(alert, animated: true)
    }
    deinit { web?.configuration.userContentController.removeScriptMessageHandler(forName: "studyZone") }
}
