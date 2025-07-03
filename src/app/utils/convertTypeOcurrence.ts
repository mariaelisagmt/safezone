/* eslint-disable @typescript-eslint/naming-convention */
import { TypeOcorrenceEnum } from '../enums/type-ocurrence.enum';

const TYPE_OCURRENCE_COLOR_MAP: Record<TypeOcorrenceEnum, string> = {
  [TypeOcorrenceEnum.Homicide]: '#d32f2f', // vermelho escuro
  [TypeOcorrenceEnum.Robbery]: '#9c27b0', // roxo
  [TypeOcorrenceEnum.Assaul]: '#f57c00', // laranja
  [TypeOcorrenceEnum.Discrimination]: '#1976d2', // azul
  [TypeOcorrenceEnum.Vandalism]: '#616161', // cinza escuro
  [TypeOcorrenceEnum.DrugRelated]: '#388e3c', // verde
  [TypeOcorrenceEnum.DomesticViolence]: '#e91e63', // rosa
};

const TYPE_OCURRENCE_ICON_MAP: Record<TypeOcorrenceEnum, string> = {
  [TypeOcorrenceEnum.Homicide]: '🔪',
  [TypeOcorrenceEnum.Robbery]: '💣',
  [TypeOcorrenceEnum.Assaul]: '🥊',
  [TypeOcorrenceEnum.Discrimination]: '⚠️',
  [TypeOcorrenceEnum.Vandalism]: '🎨',
  [TypeOcorrenceEnum.DrugRelated]: '💊',
  [TypeOcorrenceEnum.DomesticViolence]: '🏠',
};

export function getOccurrenceColor(type: string | number): string {
  const occurrenceType = Number(type) as TypeOcorrenceEnum;
  return TYPE_OCURRENCE_COLOR_MAP[occurrenceType] ?? '#9e9e9e';
}

export function getOccurrenceIcon(type: string | number): string {
  const occurrenceType = Number(type) as TypeOcorrenceEnum;
  return TYPE_OCURRENCE_ICON_MAP[occurrenceType] ?? '🚨';
}
