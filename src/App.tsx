 
import './App.css';
import Counter from './components/Counter';
import RichTextEditor from './components/RichTextEditor';
import UserForm from './components/UserForm';

const App: React.FC = () => {
  return (
    <div>
      <Counter />
      <UserForm />
     <RichTextEditor/> 
    </div>
  );
};

export default App;
