/// <reference types="react" resolution-mode="require"/>
import type { GasSufficiency } from '../../hooks/useGasSufficiency.js';
interface GasSufficiencyMessageProps {
    insufficientGas?: GasSufficiency[];
}
export declare const GasSufficiencyMessage: React.FC<GasSufficiencyMessageProps>;
export {};
