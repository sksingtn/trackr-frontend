import React from "react";
import "./Tooltip.css";

function Tooltip({ children:parent, maxLength }) {
  const firstChild = parent.props.children;

  if (typeof firstChild === "string"){
    //Simple case of slicing string data.
  if (firstChild.length <= maxLength) {
    //If length is okay, then return intact.
    return parent;
  } else {
    //If length exceeds maxlength then slice accordingly & inject the tooltip class in the parent element.
    return React.cloneElement(parent, {
      className: `${parent.props.className} tooltip`,
      tooltip: firstChild,
      children: `${firstChild.slice(0, maxLength)}..`,
    });
  }
}

else{
  //Special Case for slicing Highlighted Elements returned from search function.
  let {pre,content,post} = firstChild.props;
  const totalText = pre+content+post;

  const clipText = (start,end) => {
    return totalText.slice(start,(end>maxLength ? maxLength:end))
  }

  if (totalText.length > maxLength){
    //New variable because each step is dependent on the original value of pre,content,post
    const newPre = clipText(0,pre.length)
    const newContent = clipText(pre.length,pre.length+content.length)
    const newPost = clipText(pre.length+content.length,totalText.length)

    pre = newPre
    content = newContent
    post = newPost+".."

    const modifiedHighlight = React.cloneElement(firstChild,{pre:pre,content:content,post:post})
    return React.cloneElement(parent,{className: `${parent.props.className} tooltip`, tooltip: totalText,children:modifiedHighlight})
  }

  else{

    return parent
  }


}


}

export default Tooltip;
