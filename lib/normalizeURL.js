export default function normalizeURL(url) {
    if(url.startsWith("https://") || url.startsWith("http://")) {
        return url
    }
    else {
        return "https://" + url
    }
}