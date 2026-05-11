import { AccountTypeEnum, AccountTypeStringEnum } from "../enums/accountTypeEnum";

export const ACCOUNT_TYPE_OPTIONS = [
  { value: AccountTypeEnum.CHECKING, label: AccountTypeStringEnum.CHECKING },
  { value: AccountTypeEnum.CREDIT, label: AccountTypeStringEnum.CREDIT },
  { value: AccountTypeEnum.INVESTMENT, label: AccountTypeStringEnum.INVESTMENT },
];

export const ACCOUNT_TYPE_STRINGS: Record<string | number, string> = {
  [AccountTypeEnum.CHECKING]: AccountTypeStringEnum.CHECKING,
  [AccountTypeEnum.CREDIT]: AccountTypeStringEnum.CREDIT,
  [AccountTypeEnum.INVESTMENT]: AccountTypeStringEnum.INVESTMENT,
  Checking: AccountTypeStringEnum.CHECKING,
  Credit: AccountTypeStringEnum.CREDIT,
  Investment: AccountTypeStringEnum.INVESTMENT,
};