import { Main,Titulo,CardLogin,Error,Forms,Button,Spacing } from "./styles";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Input } from "../../components";

const Login = () =>{
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:3001/v1/login', {
            email: data.email,
            password: data.password
          });
    
          if (!response.status === 200) {
              console.log('Erro ao fazer login:', response.data);
          }
          const token = {token: response?.data?.token}
          localStorage.setItem("private",token)
          console.log(response.data);
          console.log(response.headers)
        } catch (error) {
          console.error('Erro ao fazer login:', error);
        }
      };
    return (
        <Main>
            <CardLogin>
                <Titulo>Bem vindo 😍</Titulo>
                <Spacing />
                <Forms onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Email" placeholder="seu email" type="email" {...register('email', { required: 'Por favor, insira um email.' })} />
                    {errors.email && <Error>{errors.email.message}</Error>}
                    <Spacing />
                    <Input label="Password" placeholder="seu email" type="password" {...register('password', { required: 'Por favor, insira uma senha.', minLength: 6 })}/>
                    {errors.password && <Error>{errors.password.message}</Error>}
                    <Spacing />
                    <Button type="submit">Entrar</Button>
                    <Spacing />
                </Forms>
            </CardLogin>
        </Main>
    )
};

export default Login;