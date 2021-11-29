import { ClipboardService } from "@core/services/clipboard.service";

const setStatus = (permissionStatus: PermissionState) => {
  if (permissionStatus === 'denied') {
    ClipboardService.canUseClipboard = false;
  }
}

export function queryClipboardPermission() {
  const queryOpts = {
    name: 'clipboard-read' as PermissionName,
    allowWithoutGesture: false
  };
  
  navigator.permissions.query(queryOpts).then(permissionStatus => {
    setStatus(permissionStatus.state);
  
    permissionStatus.onchange = () => {
      setStatus(permissionStatus.state);
    };
  });
}
