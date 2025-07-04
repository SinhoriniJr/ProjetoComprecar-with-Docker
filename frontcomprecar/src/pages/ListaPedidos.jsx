import React, { useEffect, useState } from "react";
import api from '../services/api'; // importa api axios configurada
import '../style/Pedidos.css'

export default function ListaPedidos() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/pedidos');  // usa api axios
      setPedidos(res.data);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const atualizarStatus = async (pedidoId, novoStatus) => {
    try {
      await api.put(`/pedidos/${pedidoId}/status`, { status: novoStatus });
      setPedidos((old) =>
        old.map((p) => (p.id === pedidoId ? { ...p, status: novoStatus } : p))
      );
    } catch (e) {
      alert(e.response?.data?.message || e.message || "Falha ao atualizar status");
    }
  };

  const renderBotaoAcao = (pedido) => {
    if (pedido.status === "PENDENTE" || pedido.status === "EM_ANDAMENTO") {
      return (
        <button
          onClick={() => atualizarStatus(pedido.id, "EM_PROCESSAMENTO")}
          className="btn-acoes"
        >
          Processar
        </button>
      );
    } else if (pedido.status === "EM_PROCESSAMENTO") {
      return (
        <button
          onClick={() => atualizarStatus(pedido.id, "FINALIZADO")}
          className="btn-acoes"
        >
          Finalizar
        </button>
      );
    }
    return null;
  };

  if (!user || (user.tipo !== "ADMIN" && user.tipo !== "FUNCIONARIO")) {
    return (
      <div className="container">
        <h2>Acesso Negado</h2>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Pedidos</h1>

      {loading && <p>Carregando pedidos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Numero do Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Status</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 && (
              <tr>
                <td colSpan="6">Nenhum pedido encontrado</td>
              </tr>
            )}
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente?.name || pedido.clienteId}</td>
                <td>{new Date(pedido.dataPedido).toLocaleString()}</td>
                <td>{pedido.status}</td>
                <td>R$ {pedido.valorTotal?.toFixed(2)}</td>
                <td>{renderBotaoAcao(pedido)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
