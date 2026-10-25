import Foundation
import WebKit
import UniformTypeIdentifiers

final class LocalContent: NSObject, WKURLSchemeHandler {
    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url,
              url.scheme == "studyzone", url.host == "localhost",
              let root = Bundle.main.url(forResource: "Web", withExtension: nil) else {
            urlSchemeTask.didFailWithError(URLError(.badURL)); return
        }
        let path = url.path.isEmpty || url.path == "/" ? "index.html" : String(url.path.dropFirst())
        let file = root.appendingPathComponent(path).standardizedFileURL
        guard file.path.hasPrefix(root.standardizedFileURL.path + "/"),
              !path.contains("\\"), let data = try? Data(contentsOf: file) else {
            urlSchemeTask.didFailWithError(URLError(.fileDoesNotExist)); return
        }
        let ext = file.pathExtension.lowercased()
        let mime = ["js": "text/javascript", "css": "text/css", "html": "text/html", "svg": "image/svg+xml", "webmanifest": "application/manifest+json"][ext]
            ?? UTType(filenameExtension: ext)?.preferredMIMEType ?? "application/octet-stream"
        let response = URLResponse(url: url, mimeType: mime, expectedContentLength: data.count, textEncodingName: "utf-8")
        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        urlSchemeTask.didFinish()
    }
    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}
}
