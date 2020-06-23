import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";

const RadioQuestionsWithoutButton = (props) => {
  const { quizData } = props;
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
    radio: {
      checked: {
        color: "green",
      },
    },
  }));

  const useStyles2 = makeStyles({
    checked: {
      color: "green !important",
    },
  });

  const classes_green = useStyles2();

  const useStyles3 = makeStyles({
    checked: {
      color: "red !important",
    },
  });

  const classes_red = useStyles3();

  const classes = useStyles();

  const { register, errors, setValue, control } = useForm();

  const [data, setData] = useState(quizData);

  const renderResult = (item) => {
    if (item.selectedValue === item.answer) {
      return <p>Верно</p>;
    }

    return <p>Не Верно, подсказка - {item.prompt}</p>;
  };

  const handleChange = (event, index) => {
    let newData = _.cloneDeep(data);
    newData[index].showAnswer = true;
    newData[index].selectedValue = event.target.value;
    setData(newData);
    return event.target.value;
  };

  const neededClass = (item) => {
    if (item.showAnswer) {
      if (item.selectedValue === item.answer) {
        return classes_green;
      }

      return classes_red;
    }
  };

  return (
    <form className="quiz__form">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <p
              style={{
                margin: 0,
              }}
            >
              {item.title}
            </p>
            <FormControl
              className={classes.formControl}
              error={Boolean(errors[item.name])}
            >
              <Controller
                as={
                  <RadioGroup
                    name={item.name}
                    ref={register({ required: true })}
                  >
                    {item.options.map((elem, index) => {
                      return (
                        <FormControlLabel
                          value={elem.value}
                          control={<Radio classes={neededClass(item)} />}
                          label={elem.title}
                        />
                      );
                    })}
                  </RadioGroup>
                }
                name={item.name}
                rules={{ required: "this is required" }}
                onChange={([event]) => handleChange(event, index)}
                control={control}
                defaultValue=""
              />
              <FormHelperText>
                {errors.wordlevel && errors.wordlevel.message}
              </FormHelperText>
            </FormControl>
            {errors[item.name] && <p>Need select answer</p>}
            {item.showAnswer ? renderResult(item) : null}
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

export default RadioQuestionsWithoutButton;
