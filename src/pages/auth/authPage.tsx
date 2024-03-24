import { TabPanel, TabView } from "primereact/tabview";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignInForm from "../../components/forms/signInForm";
import SignUpForm from "../../components/forms/signUpForm";

export default function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <TabView className="auth-card-container">
      <TabPanel header="Sign in">
        <SignInForm dispatch={dispatch} navigate={navigate} />
      </TabPanel>

      <TabPanel header="Sign up">
        <SignUpForm dispatch={dispatch} navigate={navigate} />
      </TabPanel>
    </TabView>
  );
}
