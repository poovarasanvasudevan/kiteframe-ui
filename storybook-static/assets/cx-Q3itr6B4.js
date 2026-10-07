function i(...c){const o=[];for(const n of c)if(n){if(Array.isArray(n)){const t=i(...n);t&&o.push(t);continue}o.push(n)}return o.join(" ")}export{i as c};
