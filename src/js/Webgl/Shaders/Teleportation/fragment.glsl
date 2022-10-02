uniform sampler2D prevScene;
uniform sampler2D nextScene;
uniform float progress;

varying vec2 vUv;

vec2 distort(vec2 oldUv, float pr, float expo) {
    vec2 p0 = 2. * oldUv - 1.;
    vec2 p1 = p0 / (1. - pr * length(p0) * expo);

    return (p1 + 1.) * 0.5;
}

void main() {
    float progress1 = smoothstep(0.75, 1., progress);

    vec2 uv1 = distort(vUv, -10. * pow(0.5 + 0.5 * progress, 32.), progress * 4.);
    vec2 uv2 = distort(vUv, -10. * (1. - progress1), progress * 4.);

    vec4 scenePrev = texture2D(prevScene, uv1);
    vec4 sceneNext = texture2D(nextScene, uv2);

    float mixer = progress1;
    vec4 finalTexture = mix(scenePrev, sceneNext, mixer);

    gl_FragColor = finalTexture;
}