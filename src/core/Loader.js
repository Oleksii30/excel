import {$} from '../core/dom'

export function Loader() {
  return $.create('div', 'loader').html(`
  <div class="loadingio-spinner-blocks-ulpopjh16uc"><div class="ldio-3cxxl7mj655">
<div style='left:38px;top:38px;animation-delay:0s'></div>
<div style='left:80px;top:38px;animation-delay:0.125s'>
</div><div style='left:122px;top:38px;animation-delay:0.25s'>
</div><div style='left:38px;top:80px;animation-delay:0.875s'>
</div><div style='left:122px;top:80px;animation-delay:0.375s'>
</div><div style='left:38px;top:122px;animation-delay:0.75s'>
</div><div style='left:80px;top:122px;animation-delay:0.625s'>
</div><div style='left:122px;top:122px;animation-delay:0.5s'></div>
</div></div>
<style type="text/css">
@keyframes ldio-3cxxl7mj655 {
  0% { background: #f8b26a }
  12.5% { background: #f8b26a }
  12.625% { background: #e15b64 }
  100% { background: #e15b64 }
}
.ldio-3cxxl7mj655 div {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #e15b64;
  animation: ldio-3cxxl7mj655 1s linear infinite;
}
.loadingio-spinner-blocks-ulpopjh16uc {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-3cxxl7mj655 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-3cxxl7mj655 div { box-sizing: content-box; }
/* generated by https://loading.io/ */
</style>
  `)
}
