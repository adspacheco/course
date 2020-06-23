import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";

const InputSentencesQuestionsWithoutButton = (props) => {
  const { quizData } = props;
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
  }));

  const classes = useStyles();

  const { register, errors, setValue, control } = useForm();

  const [data, setData] = useState(quizData);

  const renderResult = (item) => {
    if (
      item.selectedValue.toString().toLowerCase().trim() ===
      item.answer.toString().toLowerCase().trim()
    ) {
      return <p style={{ margin: "0px 10px" }}>Верно</p>;
    }

    return (
      <p style={{ margin: "0px 10px" }}>
        Не Верно, правильный ответ - {item.answer}
      </p>
    );
  };

  const handleChange = (event, index) => {
    let newData = _.cloneDeep(data);
    newData[index].showAnswer = true;
    newData[index].selectedValue = event.target.value;
    setData(newData);
    return event.target.value;
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {data.map((item, index) => {
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
                display: "flex",
                flex: "1",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  margin: "0px",
                  textAlign: "left",
                }}
              >
                {item.beforeSelect ? item.beforeSelect : null}
                <FormControl
                  className={classes.formControl}
                  error={Boolean(errors[item.name])}
                >
                  <Controller
                    as={
                      <TextField
                        id="standard-basic"
                        ref={register({
                          required: true,
                        })}
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
                </FormControl>{" "}
                {item.afterSelect ? item.afterSelect : null}
              </span>
              {errors[item.name] && (
                <p style={{ margin: "0px 10px" }}>Need select answer</p>
              )}
              {item.showAnswer ? renderResult(item) : null}
            </div>
          </div>
        );
      })}
      <button
        style={{ width: "40%" }}
        type="button"
        onClick={() => {
          let newData = _.cloneDeep(data);
          for (let i = 0; i < quizData.length; i++) {
            setValue(quizData[i].name, "");
            newData[i].showAnswer = false;
            newData[i].selectedValue = "Select answer";
          }
          setData(newData);
        }}
      >
        Сбросить
      </button>
    </form>
  );
};

export default InputSentencesQuestionsWithoutButton;
