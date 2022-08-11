import React, { ReactElement, ComponentProps } from "react"

import { LabeledInput } from "../../components"
import { useKimrofField } from "./useKimrofField"

type LabeledInputProps = ComponentProps<typeof LabeledInput>

interface Props extends Omit<LabeledInputProps, "onChange" | "value"> {
  name: string
}

export function KimrofLabeledField(props: Props): ReactElement {
  const fieldsProps = useKimrofField(props.name)

  return <LabeledInput {...props} {...fieldsProps} />
}
