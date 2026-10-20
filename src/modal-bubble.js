export function openDialogBubble(dialog, trigger=document.activeElement) {
 if(!dialog||dialog.open)return;
 const triggerRect=trigger instanceof Element?trigger.getBoundingClientRect():null;
 dialog.showModal();
 const dialogRect=dialog.getBoundingClientRect();
 const triggerX=triggerRect?triggerRect.left+triggerRect.width/2:dialogRect.left+dialogRect.width/2;
 const triggerY=triggerRect?triggerRect.top+triggerRect.height/2:dialogRect.top+dialogRect.height/2;
 dialog.style.setProperty('--bubble-x',`${triggerX-(dialogRect.left+dialogRect.width/2)}px`);
 dialog.style.setProperty('--bubble-y',`${triggerY-(dialogRect.top+dialogRect.height/2)}px`);
}
