vec2 pos;
uniform float time;
uniform vec2 resolution;

void main(void) {
    vec2 pos = 2.0 * gl_FragCoord.xy / resolution.y - vec2(resolution.x/resolution.y, 1.0);
    float distance = sqrt(pos.x*pos.x + pos.y*pos.y)*10.0;
    gl_FragColor = vec4(1.0+cos(time*0.97+distance), 1.0+cos(time*0.59+distance), 1.0+cos(-0.83*time+distance), 2.0)/2.0;
}