import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import { Tooltip } from "../styled/Styled";

const InputSentencesQuestions = (props) => {
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

  const [field, setField] = useState(false);

  const onSubmit = (data) => {
    setAnswer(data);
    setFormReady(true);
  };

  const renderResult = (item) => {
    if (formReady) {
      if (
        answer[item.name].toString().toLowerCase().trim() ===
        item.answer.toString().toLowerCase().trim()
      ) {
        return <Tooltip correct>Верно</Tooltip>;
      }

      return (
        <Tooltip>
          Неверно, правильный ответ - <Tooltip correct>{item.answer}</Tooltip>
        </Tooltip>
      );
    }
  };

  const handleChange = (event) => {
    setFormReady(false);
    return event.target.value;
  };

  return (
    <form className="form inputForm" onSubmit={handleSubmit(onSubmit)}>
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
              {/* {index + 1} */}
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
                {item.beforePhrase
                  ? item.beforePhrase.map((item, index) => (
                      <div className="dialog dialog__phrase" key={index}>
                        {item}
                      </div>
                    ))
                  : null}
                {item.beforeSelect ? (
                  <div className="dialog dialog__before">
                    {item.beforeSelect}
                  </div>
                ) : null}
                <FormControl
                  className={classes.formControl}
                  error={Boolean(errors[item.name])}
                  name={item.name}
                >
                  <Controller
                    as={
                      <TextField
                        name={item.name}
                        id="standard-basic228"
                        style={{
                          margin: "0px !important",
                        }}
                      />
                    }
                    name={item.name}
                    rules={{ required: "this is required" }}
                    control={control}
                    onChange={([event]) => handleChange(event, index)}
                    defaultValue=""
                  />
                  <FormHelperText>
                    {errors.wordlevel && errors.wordlevel.message}
                  </FormHelperText>
                </FormControl>
                {item.afterSelect ? (
                  <div className="dialog dialog__after">{item.afterSelect}</div>
                ) : null}
                {item.afterPhrase
                  ? item.afterPhrase.map((item, index) => (
                      <div className="dialog dialog__phrase" key={index}>
                        {item}
                      </div>
                    ))
                  : null}
              </span>
              {/* {errors[item.name] && (
                <div className="answer__tooltip">
                  Впишите ответ ({item.name})
                </div>
              )} */}
              {renderResult(item)}
            </div>
          </div>
        );
      })}
      {Object.keys(errors).length !== 0 && field && (
        <div className="answer__tooltip">Заполните все поля</div>
      )}
      <div className="multi-button">
        <button
          className="buttonR"
          type="submit"
          onClick={() => setField(true)}
        >
          Проверить
        </button>
        <button
          type="button"
          className="buttonR"
          onClick={() => {
            for (let i = 0; i < quizData.length; i++) {
              setValue(quizData[i].name, "");
              errors[quizData[i].name] = null;
            }
            setFormReady(false);
            setAnswer({});
            setField(false);
          }}
        >
          Сбросить
        </button>
      </div>
    </form>
  );
};

export default InputSentencesQuestions;
