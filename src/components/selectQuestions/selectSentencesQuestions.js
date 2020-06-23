import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import { Tooltip } from "../styled/Styled";

const SelectSentencesQuestions = (props) => {
  const { quizData } = props;
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
  }));

  const classes = useStyles();

  const { handleSubmit, errors, setValue, control } = useForm();

  const [formReady, setFormReady] = useState(false);

  const [answer, setAnswer] = useState({});

  const onSubmit = (data) => {
    setAnswer(data);
    setFormReady(true);
  };

  const renderResult = (item) => {
    if (formReady) {
      if (answer[item.name] === item.answer) {
        return <Tooltip correct>Верно</Tooltip>;
      }
      return (
        <Tooltip>
          Неверно, правильный ответ - <Tooltip correct>{item.answer}</Tooltip>
        </Tooltip>
      );
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {quizData.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <p
              style={{
                margin: "0px 10px",
              }}
            >
              {index + 1}
            </p>
            <div
              style={{
                textAlign: "left",
              }}
            >
              <span
                style={{
                  margin: "0px",
                  textAlign: "left",
                }}
              >
                {item.beforeSelect ? (
                  <div className="dialog dialog__before">
                    {item.beforeSelect}
                  </div>
                ) : null}
                <FormControl
                  className={classes.formControl}
                  error={Boolean(errors[item.name])}
                >
                  <Controller
                    as={
                      <Select name={item.name} defaultValue="">
                        {item.options.map((elem, index) => {
                          return (
                            <MenuItem key={index} value={elem}>
                              {elem}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    }
                    name={item.name}
                    rules={{ required: "this is required" }}
                    // onChange={([event]) => handleChange(event)}
                    control={control}
                    defaultValue=""
                  />
                  <FormHelperText>
                    {errors.wordlevel && errors.wordlevel.message}
                  </FormHelperText>
                </FormControl>
                {item.afterSelect ? (
                  <div className="dialog dialog__after">{item.afterSelect}</div>
                ) : null}
              </span>
              {errors[item.name] && (
                <div className="answer__tooltip">
                  Выберите ответ ({item.name})
                </div>
              )}
              {renderResult(item)}
            </div>
          </div>
        );
      })}
      <button
        style={{ width: "40%" }}
        type="button"
        onClick={() => {
          for (let i = 0; i < quizData.length; i++) {
            setValue(quizData[i].name, "");
          }
          setFormReady(false);
        }}
      >
        Сбросить
      </button>
      <button style={{ width: "40%" }} type="submit">
        Проверить
      </button>
    </form>
  );
};

export default SelectSentencesQuestions;
