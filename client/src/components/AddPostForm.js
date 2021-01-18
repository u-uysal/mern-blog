import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import { createPost } from "../actions/post";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));
//constants
const tags = ["fun", "programming", "health", "science"];

//form validation
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const [file, setFile] = useState(null);

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="title"
              label="Title"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id="subtitle"
              label="Subtitle"
              name="subtitle"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.subtitle ? true : false}
              fullWidth
            />
            <Controller
              as={
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="tag"
              control={control}
              error={errors.tag ? true : false}
              defaultValue={tags[0]}
            />

            <TextField
              id="content"
              label="Content"
              name="content"
              multiline
              size="small"
              inputRef={register}
              rows={4}
              className={classes.textField}
              variant="outlined"
              error={errors.content ? true : false}
              fullWidth
            />

            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearForm} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => handleSubmit(onSubmit)()}
          color="primary"
          variant="outlined"
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
