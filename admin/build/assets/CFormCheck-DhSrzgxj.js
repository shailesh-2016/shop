import{r as v,_ as j,R as e,b as d,P as a,c as r}from"./index-Huc91Zyl.js";import{h as C,c as y}from"./index.esm-Bue5CfUv.js";import{k as w}from"./DefaultLayout-Cszy7XE9.js";var g=v.forwardRef(function(t,N){var k=t.className,n=t.button,R=t.feedback,L=t.feedbackInvalid,V=t.feedbackValid,x=t.floatingLabel,A=t.tooltipFeedback,p=t.hitArea,l=t.id,s=t.indeterminate,I=t.inline,m=t.invalid,i=t.label,T=t.reverse,h=t.type,O=h===void 0?"checkbox":h,b=t.valid,E=j(t,["className","button","feedback","feedbackInvalid","feedbackValid","floatingLabel","tooltipFeedback","hitArea","id","indeterminate","inline","invalid","label","reverse","type","valid"]),c=v.useRef(null),z=w(N,c);v.useEffect(function(){c.current&&s&&(c.current.indeterminate=s)},[s,c.current]);var o=function(){return e.createElement("input",d({type:O,className:r(n?"btn-check":"form-check-input",{"is-invalid":m,"is-valid":b,"me-2":p}),id:l},E,{ref:z}))},f=function(){return e.createElement(C,{describedby:E["aria-describedby"],feedback:R,feedbackInvalid:L,feedbackValid:V,floatingLabel:x,invalid:m,tooltipFeedback:A,valid:b})},F=function(){var u;return e.createElement(y,d({customClassName:r(n?r("btn",n.variant?"btn-".concat(n.variant,"-").concat(n.color):"btn-".concat(n.color),(u={},u["btn-".concat(n.size)]=n.size,u),"".concat(n.shape)):"form-check-label")},l&&{htmlFor:l}),i)},P=function(){return n?e.createElement(e.Fragment,null,e.createElement(o,null),i&&e.createElement(F,null),e.createElement(f,null)):i?p?e.createElement(e.Fragment,null,e.createElement(o,null),e.createElement(y,d({customClassName:r("form-check-label stretched-link",k)},l&&{htmlFor:l}),i),e.createElement(f,null)):e.createElement("div",{className:r("form-check",{"form-check-inline":I,"form-check-reverse":T,"is-invalid":m,"is-valid":b},k)},e.createElement(o,null),e.createElement(F,null),e.createElement(f,null)):e.createElement(o,null)};return e.createElement(P,null)});g.propTypes=d({button:a.object,className:a.string,hitArea:a.oneOf(["full"]),id:a.string,indeterminate:a.bool,inline:a.bool,label:a.oneOfType([a.string,a.node]),reverse:a.bool,type:a.oneOf(["checkbox","radio"])},C.propTypes);g.displayName="CFormCheck";export{g as C};
