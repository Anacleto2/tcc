
import { useState, type ChangeEvent, type FormEvent } from "react";
import "./register.css";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function CriacaoDeConta() {

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    if (formData.senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    console.log("Dados do utilizador:", formData);

    alert("Conta criada com sucesso!");

    setFormData({
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>CIDRÁLIA</h1>

        <p className="subtitle">Criação de Contas</p>

        <form onSubmit={handleSubmit}>

          <label>Nome completo</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o seu nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="exemplo@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Digite a sua senha"
            value={formData.senha}
            onChange={handleChange}
            minLength={8}
            required
          />

          <label>Confirmação de senha</label>
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirme a sua senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />

          {erro && (
            <p className="error-message">{erro}</p>
          )}

          <button type="submit">
            Criar Conta
          </button>

        </form>

        <p className="login-link">
          Já possui uma conta?
          <a href="/login"> Iniciar sessão</a>
        </p>

      </div>
    </div>
  );
}
