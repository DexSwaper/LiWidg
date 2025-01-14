import { jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getStepFeeCostsBreakdown } from '../../utils/fees.js';
export const StepFees = ({ step, ...other }) => {
    const { t } = useTranslation();
    const isDone = step.execution?.status === 'DONE';
    const gasCosts = step.execution?.gasCosts ?? step.estimate.gasCosts;
    const feeCosts = step.execution?.feeCosts ?? step.estimate.feeCosts;
    let fees = 0;
    if (gasCosts) {
        const { amountUSD } = getStepFeeCostsBreakdown(gasCosts);
        fees += amountUSD;
    }
    if (feeCosts) {
        const filteredfeeCosts = feeCosts?.filter((fee) => !fee.included);
        if (filteredfeeCosts?.length) {
            const { amountUSD } = getStepFeeCostsBreakdown(filteredfeeCosts);
            fees += amountUSD;
        }
    }
    return (_jsxs(Typography, { fontSize: 12, fontWeight: "500", color: "text.secondary", lineHeight: 1.3334, ...other, children: [t(`format.currency`, { value: fees }), ' ', isDone ? t('main.fees.paid') : t('main.fees.estimated')] }));
};
//# sourceMappingURL=StepFees.js.map