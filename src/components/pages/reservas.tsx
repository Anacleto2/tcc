

import { useState, type FormEvent } from "react";
import "./Reservas.css";

interface Passageiro {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
}

const precoPorPessoa = 85000;

const lugaresOcupados = ["1A", "1C", "2B", "3D", "4A", "5F", "6C", "7E"];

const colunas = ["A", "B", "C", "D", "E", "F"];

export default function Reserva() {
  const [viajantes, setViajantes] = useState(1);

  const [dataIda, setDataIda] = useState("");
  const [dataVolta, setDataVolta] = useState("");

  const [assentosSelecionados, setAssentosSelecionados] =
    useState<string[]>([]);

  const [passageiro, setPassageiro] = useState<Passageiro>({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
  });

  const [erro, setErro] = useState("");

  const total = viajantes * precoPorPessoa;

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const handlePassageiro = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassageiro({
      ...passageiro,
      [e.target.name]: e.target.value,
    });
  };

  const alterarViajantes = (quantidade: number) => {
    if (quantidade < 1 || quantidade > 6) return;

    setViajantes(quantidade);
    setAssentosSelecionados((atuais) =>
      atuais.slice(0, quantidade)
    );
  };

  const selecionarAssento = (assento: string) => {
    setErro("");

    if (lugaresOcupados.includes(assento)) return;

    if (assentosSelecionados.includes(assento)) {
      setAssentosSelecionados(
        assentosSelecionados.filter((item) => item !== assento)
      );
      return;
    }

    if (assentosSelecionados.length >= viajantes) {
      setErro(`Pode selecionar apenas ${viajantes} assento(s).`);
      return;
    }

    setAssentosSelecionados([
      ...assentosSelecionados,
      assento,
    ]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    if (!dataIda) {
      setErro("Selecione a data de ida.");
      return;
    }

    if (dataVolta && dataVolta < dataIda) {
      setErro("A data de volta não pode ser anterior à ida.");
      return;
    }

    if (assentosSelecionados.length !== viajantes) {
      setErro(`Selecione ${viajantes} assento(s) para continuar.`);
      return;
    }

    const dadosReserva = {
      viagem: "Benguela - Luanda",
      dataIda,
      dataVolta,
      viajantes,
      passageiro,
      assentos: assentosSelecionados,
      total,
    };

    console.log("Reserva:", dadosReserva);

    alert("Reserva realizada com sucesso!");

  };

  return (
    <div className="reserva-page">

      {/* CABEÇALHO */}
      <header className="reserva-header">
        <a href="/" className="reserva-logo">
          ✈ CIDRÁLIA
        </a>

        <nav>
          <a href="/">Início</a>
          <a href="/destinos">Destinos</a>
          <a href="/login">Entrar</a>
          <a href="/register" className="btn-cadastro">
            Cadastrar
          </a>
        </nav>
      </header>

      <form className="reserva-layout" onSubmit={handleSubmit}>

        {/* FORMULÁRIO PRINCIPAL */}
        <main className="reserva-main">

          <h2>Complete sua Reserva</h2>

          {/* DETALHES DA VIAGEM */}
          <section className="reserva-section">

            <h3>Detalhes da Viagem</h3>

            <div className="campo">
              <label>Número de Viajantes</label>

              <input
                type="number"
                min="1"
                max="6"
                value={viajantes}
                onChange={(e) =>
                  alterarViajantes(Number(e.target.value))
                }
                required
              />
            </div>

            <div className="campos-duplos">

              <div className="campo">
                <label>Data de Ida</label>
                <input
                  type="date"
                  value={dataIda}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDataIda(e.target.value)}
                  required
                />
              </div>

              <div className="campo">
                <label>Data de Volta</label>
                <input
                  type="date"
                  value={dataVolta}
                  min={dataIda || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDataVolta(e.target.value)}
                />
              </div>

            </div>
          </section>

          {/* DADOS PESSOAIS */}
          <section className="reserva-section">

            <h3>Dados Pessoais</h3>

            <div className="campo">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Como aparece no documento"
                value={passageiro.nome}
                onChange={handlePassageiro}
                required
              />
            </div>

            <div className="campos-duplos">

              <div className="campo">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={passageiro.email}
                  onChange={handlePassageiro}
                  required
                />
              </div>

              <div className="campo">
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="+244 900 000 000"
                  value={passageiro.telefone}
                  onChange={handlePassageiro}
                  required
                />
              </div>

            </div>

            <div className="campo">
              <label>Número do Documento</label>
              <input
                type="text"
                name="documento"
                placeholder="Número do BI ou Passaporte"
                value={passageiro.documento}
                onChange={handlePassageiro}
                required
              />
            </div>

          </section>

          {/* ESCOLHA DE ASSENTOS */}
          <section className="reserva-section">

            <h3>Escolha o seu Assento</h3>

            <p className="assento-descricao">
              Selecione os lugares onde pretende viajar.
              Pode escolher {viajantes} assento(s).
            </p>

            {/* LEGENDA */}
            <div className="assento-legenda">

              <span>
                <i className="legenda-disponivel"></i>
                Disponível
              </span>

              <span>
                <i className="legenda-selecionado"></i>
                Selecionado
              </span>

              <span>
                <i className="legenda-ocupado"></i>
                Ocupado
              </span>

            </div>

            {/* MAPA DO AUTOCARRO */}
            <div className="autocarro">

              <div className="autocarro-frente">
                <span>🚍 FRENTE DO AUTOCARRO</span>
                <span>VOLANTE</span>
              </div>

              <div className="mapa-assentos">

                {Array.from({ length: 8 }, (_, index) => {
                  const numero = index + 1;

                  return (
                    <div className="fila-assentos" key={numero}>

                      <span className="numero-fila">
                        {numero}
                      </span>

                      <div className="grupo-assentos">
                        {colunas.slice(0, 3).map((coluna) => {
                          const assento = `${numero}${coluna}`;

                          const ocupado = lugaresOcupados.includes(assento);
                          const selecionado = assentosSelecionados.includes(assento);

                          return (
                            <button
                              key={assento}
                              type="button"
                              disabled={ocupado}
                              className={`assento ${
                                ocupado
                                  ? "ocupado"
                                  : selecionado
                                  ? "selecionado"
                                  : "disponivel"
                              }`}
                              onClick={() => selecionarAssento(assento)}
                              title={`Assento ${assento}`}
                            >
                              {coluna}
                            </button>
                          );
                        })}
                      </div>

                      <div className="corredor"></div>

                      <div className="grupo-assentos">
                        {colunas.slice(3, 6).map((coluna) => {
                          const assento = `${numero}${coluna}`;

                          const ocupado = lugaresOcupados.includes(assento);
                          const selecionado = assentosSelecionados.includes(assento);

                          return (
                            <button
                              key={assento}
                              type="button"
                              disabled={ocupado}
                              className={`assento ${
                                ocupado
                                  ? "ocupado"
                                  : selecionado
                                  ? "selecionado"
                                  : "disponivel"
                              }`}
                              onClick={() => selecionarAssento(assento)}
                              title={`Assento ${assento}`}
                            >
                              {coluna}
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}

              </div>

              <div className="autocarro-fundo">
                FIM DO AUTOCARRO
              </div>

            </div>

            {/* ASSENTOS ESCOLHIDOS */}
            <div className="assentos-escolhidos">
              <strong>Seus assentos:</strong>

              {assentosSelecionados.length > 0
                ? assentosSelecionados.join(", ")
                : " Nenhum assento selecionado"}
            </div>

          </section>

          {erro && (
            <p className="reserva-erro">
              {erro}
            </p>
          )}

          <button type="submit" className="btn-confirmar">
            Confirmar Reserva
          </button>

        </main>

        {/* RESUMO DA RESERVA */}
        <aside className="reserva-resumo">

          <h3>Resumo da Reserva</h3>

          <div className="imagem-destino">
            <div className="imagem-destino-texto">
              ✈
              <span>BENGUELA → LUANDA</span>
            </div>
          </div>

          <h2>Benguela - Luanda</h2>

          <p className="localizacao">
            Angola
          </p>

          <div className="resumo-detalhes">

            <div>
              <span>Data de ida</span>
              <strong>{dataIda || "Não selecionada"}</strong>
            </div>

            <div>
              <span>Data de volta</span>
              <strong>{dataVolta || "Não selecionada"}</strong>
            </div>

            <div>
              <span>Viajantes</span>
              <strong>{viajantes}</strong>
            </div>

            <div>
              <span>Assentos</span>
              <strong>
                {assentosSelecionados.join(", ") || "Por selecionar"}
              </strong>
            </div>

            <div>
              <span>Preço por pessoa</span>
              <strong>{formatarPreco(precoPorPessoa)}</strong>
            </div>

          </div>

          <div className="resumo-total">
            <strong>Total</strong>
            <strong>{formatarPreco(total)}</strong>
          </div>

          <p className="resumo-nota">
            ✓ Verifique os seus dados e os assentos antes de confirmar.
          </p>

        </aside>

      </form>
    </div>
  );
}

 