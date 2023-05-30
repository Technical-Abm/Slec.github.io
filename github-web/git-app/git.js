font_styling();

function font_styling() {
    let font = () => {
        const font_awesome = document.getElementById('main-text-js');
        font_awesome.style.color = '#363636';
        font_awesome.style.letterSpacing = '1px';
        font_awesome.style.fontSize = '16px';
    };
    font();
};

function copyText() {
    const copy = () => {
        const formatText = document.getElementById('list-copy');
        navigator.clipboard.writeText(formatText.textContent)
    };
    copy();
}

function ipCopy() {
    const ip_cmd = () => {
        const formatText = document.getElementById('list-copy-2');
        navigator.clipboard.writeText(formatText.textContent);
    };
    ip_cmd();
}

function encode() {
    const encoder = () => {
        const encode_url = document.getElementById("list-copy-3");
        navigator.clipboard.writeText(encode_url.textContent);
    };
    encoder();
}