import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from '@mui/material';
import { SmallAvatarSkeleton } from '../SmallAvatar.js';
import { AvatarDefault, AvatarDefaultBadge, AvatarSkeleton, } from './Avatar.style.js';
export const AvatarBadgedDefault = ({ sx }) => {
    return (_jsx(Badge, { overlap: "circular", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, badgeContent: _jsx(AvatarDefaultBadge, {}), sx: sx, children: _jsx(AvatarDefault, {}) }));
};
export const AvatarBadgedSkeleton = ({ sx }) => {
    return (_jsx(Badge, { overlap: "circular", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, badgeContent: _jsx(SmallAvatarSkeleton, {}), sx: sx, children: _jsx(AvatarSkeleton, { width: 40, height: 40, variant: "circular" }) }));
};
//# sourceMappingURL=Avatar.js.map