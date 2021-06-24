import TextField from "@atlaskit/textfield";
import {
  Field,
  FormFooter,
  ErrorMessage,
  HelperMessage,
  ValidMessage
} from "@atlaskit/form";
import React, { Fragment } from "react";
import { Meta } from "@atlaskit/form/dist/types/Field";

export interface ITextBoxProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  isPassword?: boolean;
  isNumber?: boolean;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  doNotValidate?: boolean;
  validate?: (value: string) => boolean;
  invalid?: string;
  valid?: string;
  shouldFitContainer?: boolean;
  testId?: string;
  isSpellCheckEnabled?: boolean;
  autoComplete?: string;
  children?: React.ReactNode;
}

const hasInvalidChars = (checkme: string): boolean => checkme.includes("%");

const validation = (
  value: string,
  _formState: Object,
  _fieldState: Meta
): void | string | Promise<string | void> =>
  new Promise((resolve) => {
    console.log("input value:" + value);
    setTimeout(() => {
      if (value && value.length <= 2) {
        console.info("I am here");
        resolve("TOO_SHORT");
      }
      if (value && hasInvalidChars(value)) {
        console.info("I am there");
        resolve("INVALID_CHARS");
      }
      console.info("Should not be here");
      resolve(undefined);
    }, 500);
  });

const type = (isPassword?: boolean, isNumber?: boolean): string => {
  if (isPassword) {
    return "password";
  } else if (isNumber) {
    return "number";
  } else {
    return "text";
  }
};

const TextBox = (props: ITextBoxProps) => {
  return (
    <form>
      <div data-testid={props.testId}>
        <Field
          label={props.label || undefined}
          name={"props.testId"}
          defaultValue=""
          isRequired
          validate={validation}
        >
          {(fieldData) => (
            <Fragment>
              <TextField
                id={props.id}
                name={props.testId}
                placeholder={props.placeholder || ""}
                value={props.value}
                isDisabled={props.disabled || false}
                type={type(props.isPassword, props.isNumber)}
                step={props.step ? props.step : 1}
                // tslint:disable-next-line:jsx-no-lambda
                onChange={(event: any) =>
                  props.onChange && props.onChange(event.target.value)
                }
                autoComplete={props.autoComplete ? props.autoComplete : "off"}
                spellCheck={
                  props.isSpellCheckEnabled === undefined
                    ? true
                    : props.isSpellCheckEnabled
                }
                {...fieldData.fieldProps}
              />
              {!fieldData.error && !fieldData.valid && (
                <HelperMessage>
                  Pick a memorable name that others will see
                </HelperMessage>
              )}
              {fieldData.valid && (
                <ValidMessage>
                  Nice one, this username is available
                </ValidMessage>
              )}
              {fieldData.error === "TOO_SHORT" && (
                <ErrorMessage>
                  Too short, username needs to be more than 2 characters
                </ErrorMessage>
              )}
              {fieldData.error === "INVALID_CHARS" && (
                <ErrorMessage>
                  This username is taken by somebody, try something else
                </ErrorMessage>
              )}
            </Fragment>
          )}
        </Field>
      </div>
    </form>
  );
};

export default TextBox;
