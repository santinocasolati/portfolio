uniform sampler2D uText;
uniform float colorR;
uniform float colorG;
uniform float colorB;

varying vec2 vUv;

void main() {
    vec4 txt = texture2D(uText, vUv);

    vec4 finalTxt = mix(txt, vec4(colorR, colorG, colorB, 1), 0.002);

    gl_FragColor = finalTxt;
}