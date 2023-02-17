export interface purchaseItem {
  src: string
  cardTitle: string
  description: string
  SKU: string
  optionalMessage?: string
}

export type payloadProps = {
  from_name: string
  message?: string
  reply_to: string
  SKU?: string
  name?: string
  phone?: string
}

export interface requiredFieldsType {
  [key: string]: {
    fieldValue: string
    errors: Set<string>
    type: string
    prefixIcon: string
    suffixIcon?: string
    label_placeholder: string
    ref?: object
  }
}
