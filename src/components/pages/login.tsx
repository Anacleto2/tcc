import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    })

    const navegate = useNavigate()


    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-[#103D67] p-3 rounded-xl">
                        <span className="text-white text-2xl">✈</span>
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-[#103D67] tracking-wide">
                            CIDRÁLIA
                        </h1>
                        <p className="text-xs text-slate-500 tracking-widest">
                            VIAGENS E TURISMO
                        </p>
                    </div>
                </div>

                {/* Título */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                        Bem-vindo de volta!
                    </h2>

                    <p className="text-slate-500 text-sm">
                        Entre na sua conta para gerir as suas viagens e reservas.
                    </p>
                </div>

                {/* Formulário */}
                <form className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            E-mail
                        </label>

                        <div className="flex items-center border border-slate-300 rounded-xl px-4 transition-all focus-within:border-[#1673B9] focus-within:ring-4 focus-within:ring-blue-100">
                            <span className="text-slate-400 mr-3">✉</span>

                            <input
                                type="email"
                                placeholder="Digite o seu e-mail"
                                required
                                className="w-full py-3.5 outline-none bg-transparent text-slate-700 placeholder:text-slate-400 text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}


                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Senha
                        </label>

                        <div className="flex items-center border border-slate-300 rounded-xl px-4 transition-all focus-within:border-[#1673B9] focus-within:ring-4 focus-within:ring-blue-100">

                            <span className="text-slate-400 mr-3">🔒</span>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite a sua senha"
                                required
                                className="w-full py-3.5 outline-none bg-transparent text-slate-700 placeholder:text-slate-400 text-sm"
                                value={formData.senha}
                                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}

                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-xs text-slate-500 hover:text-[#1673B9]"
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>

                    {/* Opções */}
                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-[#103D67] w-4 h-4"
                            />
                            Lembrar-me
                        </label>

                        <a
                            href="/recuperar-senha"
                            className="text-[#1673B9] font-semibold hover:underline"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>

                    {/* Botão */}
                    <button
                        type="submit"
                        className="w-full bg-[#103D67] hover:bg-[#1673B9] text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                        Entrar na minha conta →
                    </button>

                </form>

                {/* Registo */}
                <div className="text-center mt-7 text-sm text-slate-500">
                    Ainda não tem uma conta?

                    <button
                        type="button"
                        onClick={() => navegate("/criacao-de-conta")} className="text-[#1673B9] font-bold ml-1 hover:underline"
                    >
                        Criar conta
                    </button>
                </div>

                {/* Rodapé */}
                <div className="border-t border-slate-100 mt-7 pt-5 text-center">
                    <p className="text-xs text-slate-400">
                        © 2026 Cidrália. Todos os direitos reservados.
                    </p>
                </div>

            </div>
        </div>
    );
}
