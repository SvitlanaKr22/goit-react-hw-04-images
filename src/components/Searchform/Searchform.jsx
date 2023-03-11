import { Formik } from 'formik';
import {
  Form,
  ButtonForm,
  Field,
  ErrorMessage,
  BiSearch,
} from './Searchform.styled';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  searchName: Yup.string('')
    .trim()
    .lowercase()
    .matches(/[abcdefghijklmnopqrstuvwxyz]+/, 'Is not in correct format')
    .required('Please enter here what you are looking for'),
});

const Searchform = ({ onSearch }) => (
  <Formik
    initialValues={{ searchName: '' }}
    validationSchema={SignupSchema}
    onSubmit={(values, actions) => {
      const { searchName } = values;
      onSearch(searchName);
      actions.resetForm();
    }}
  >
    <Form>
      <ButtonForm type="submit">
        <BiSearch />
      </ButtonForm>
      <div>
        <Field
          type="text"
          name="searchName"
          placeholder="Search images and photos"
        />
        <ErrorMessage name="searchName" component="div" />
      </div>
    </Form>
  </Formik>
);

export default Searchform;
