"use strict";function init(){loadUI();for(var e=document.getElementsByClassName("watcher"),a=0;a<e.length;a++)e[a].addEventListener("change",render);render()}window.onload=function(){init()};var baseColumn=function(){var e=document.getElementById("width").value,a=document.getElementById("colcounts").value,n=document.getElementById("colspase").value;return Number(e/a-2*n)},clearLine=function(){return"<div>&nbsp;</div>"},commentLine=function(e){return'<div class="comment">/* '.concat(e," */</div>")},commentStroke=function(e){return'<span class="comment">// '.concat(e,"</div>")},lineSpaces=function(e){var a=new String("");if(0<e)for(var n=0;n<e;n++)a+="&nbsp;";return a},attributeLine=function(e,a,n,t){return"<div>".concat(lineSpaces(e),'<span class="attributes">').concat(a,'</span>: <span class="').concat(n,'">').concat(t,"</span>;</div>")};function classBlock(e,a,n){var t=new String("");t+="<div>".concat(lineSpaces(e),'<span class="stylenames">.').concat(a,"</span> {</div>");for(var l=0;l<n.length;l++)t+=attributeLine(n[l][0],n[l][1],n[l][2],n[l][3]);return t+="<div>".concat(lineSpaces(e),"}</div>")}function render(){var e=new String("");e+=baseSCSS(),e+=gridSCSS(),result.innerHTML=e}function variableSCSSLine(e,a,n,t){var l="";return t&&(l="&nbsp;//&nbsp;".concat(t)),'<div><span class="variable">$'.concat(e,'</span>: <span class="').concat(a,'">').concat(n,"</span>;").concat(l,"</div>")}function scssFor(e,a,n){var t=new String("");switch(e){case"for":t+='<div><span class="stylenames">@for <span class="variable">$i</span> from 1 through</span> <span class="variable">$column-count</span></span> {';break;case"supports":t+='<div><span class="stylenames">@supports</span> '.concat(a,"{</div>")}for(var l=0;l<n.length;l++)t+=classBlock(n[l][0],n[l][1],n[l][2]);return t+="<div>}</div>"}function baseSCSS(){var e=new String("");return e+=commentLine(locales[langLib].texts[6]),e+=variableSCSSLine("content-width","number","".concat(document.getElementById("width").value,"px")),e+=variableSCSSLine("column-count","number",document.getElementById("colcounts").value),e+=variableSCSSLine("column-spase","number","".concat(document.getElementById("colspase").value,"px")),e+=variableSCSSLine("column-width","",'(<span class="variable">$content-width</span> / <span class="variable">$column-count</span>) - (<span class="variable">$column-spase</span> * <span class="number">2</span>)',"".concat(baseColumn(),"px")),e+=clearLine(),e+=commentLine(locales[langLib].texts[7]),e+=classBlock(0,document.getElementById("wrappername").value,[[4,"width","number","100%"]]),e+=classBlock(0,document.getElementById("rowname").value,[[4,"width","variable","$content-width"]]),e+=clearLine()}function gridSCSS(){var e=new String("");return e+=commentLine(locales[langLib].texts[8]),e+=scssFor("for",document.getElementById("colcounts").value,[[4,"".concat(document.getElementById("colprefix").value,'-#{<span class="variable">$i</span>}'),[[8,"width","",'(<span class="variable">$column-width</span> * <span class="variable">$i</span>) + ((<span class="variable">$i</span> - <span class="number">1</span>) * (<span class="variable">$column-spase</span> * <span class="number">2</span>))'],[8,"margin","number","0 ".concat(document.getElementById("colspase").value,"px")]]]])}var locales=[{locale:"en",texts:["Wrapper name","Container name","Column prefix","Content Width","Number of columns","Column Interval","Main variables","Main containers","Grid columns"]},{locale:"ru",texts:["Название блока-обертки","Контейнер колонок","Префикс колонок","Ширина контента","Количество колонок","Межколоночный интервал","Основные переменные","Основные контейнеры","Колонки для сетки"]}];function loadUI(){window.langLib=langSet();var e='<section class="toggles"><div class="generator"><h1>Grid Composer</h1><label><span>'.concat(locales[langLib].texts[0],'</span><input class="watcher" id="wrappername" type="text" value="wrapper"></label><label><span>').concat(locales[langLib].texts[1],'</span><input class="watcher" id="rowname" type="text" value="row"></label><label><span>').concat(locales[langLib].texts[2],'</span><input class="watcher" id="colprefix" type="text" value="col"></label><hr><label><span>').concat(locales[langLib].texts[3],'</span><input class="watcher" id="width" type="number" step="10" value="1000"></label><label><span>').concat(locales[langLib].texts[4],'</span><input class="watcher" id="colcounts" type="number" min="1" value="4"></label><label><span>').concat(locales[langLib].texts[5],'</span><input class="watcher" id="colspase" type="number" min="1" value="10"></label></div><div class="settings">').concat(settingsUI(),'</div></section><section class="outputarea"><pre class="').concat(setColor(),'"><code id="result"></code></pre></section>');document.getElementById("root").innerHTML=e,setColorButton()}function settingsUI(){return'<div class="toggle_color">\n        <label class="dark">\n            <input type="radio" name="color" value="dark" onChange="switchColor(\'dark\')">\n            <span></span>\n        </label>\n        <label class="white">\n            <input type="radio" name="color" value="white" onChange="switchColor(\'white\')">\n            <span></span>\n        </label>\n    </div>'}function langSet(){var e=new String;localStorage.getItem("gc-lang")?e=localStorage.getItem("gc-lang"):(e=navigator.language,localStorage.setItem("gc-lang",e)),document.getElementsByTagName("html")[0].lang=e;for(var a=0,n=0;n<locales.length;n++)e==locales[n].locale&&(a=n);return a}function setColor(){console.log("setColor()");var e="dark";return localStorage.getItem("gc-color")&&(e=localStorage.getItem("gc-color")),localStorage.setItem("gc-color",e),"code-".concat(e)}function switchColor(e){var a="code-"+e,n=document.getElementsByTagName("pre")[0].classList,t=n.value;n.remove(t),n.add(a),localStorage.setItem("gc-color",e)}function setColorButton(){for(var e=localStorage.getItem("gc-color"),a=document.getElementsByName("color"),n=0;n<a.length;n++)a[n].value==e&&(a[n].checked=!0)}