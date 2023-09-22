const a={1:{title:"Robin Mercer",abbr:"RM",color:"var(--iui-color-background-sunglow)"},2:{title:"Terry Rivers",abbr:"TR",color:"var(--iui-color-background-skyblue)"}};class i extends HTMLElement{constructor(){super()}connectedCallback(){const t=a[this.getAttribute("type")||1],e=this.getAttribute("status"),s=this.getAttribute("size")||"medium",r=this.getAttribute("showPlaceholder"),o=`
      <span
        class="iui-avatar iui-${s}"
        title="${t.title}"
        style="background-color: ${t.color};"
        ${e?"data-iui-status="+e:""}
      >
        ${t.abbr}
        ${r?'<img src="./assets/user-placeholder.png" alt="" />':""}
      </span>`;this.insertAdjacentHTML("afterend",o),this.remove()}}customElements.define("x-avatar",i);
