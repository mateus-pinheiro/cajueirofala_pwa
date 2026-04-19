# Cajueiro Fala

Um PWA (Progressive Web App) desenvolvido em Next.js para coletar sugestões e comentários da comunidade de Barra Grande (PI) sobre melhorias que podem ser feitas na região.

## 🎯 Objetivo

O projeto Cajueiro Fala é uma plataforma simples e intuitiva que permite que moradores de Barra Grande compartilhem suas ideias e sugestões sobre o que pode ser melhorado na comunidade.

## ✨ Funcionalidades

- **Tela de Boas-vindas**: Interface limpa e minimalista para envio de sugestões
- **Armazenamento Local**: Comentários salvos no localStorage do navegador
- **Painel Administrativo**: Visualização de todas as sugestões enviadas
- **Exportação CSV**: Exporte todos os comentários para análise
- **PWA**: Funciona offline e pode ser instalado como aplicativo
- **Design Responsivo**: Otimizado para dispositivos móveis

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Entre na pasta do projeto:
```bash
cd cajueiro-fala
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📱 Instalando como PWA

1. Abra o app no navegador (Chrome, Safari, Edge)
2. Procure pela opção "Instalar App" ou "Adicionar à Tela Inicial"
3. Confirme a instalação
4. O app estará disponível como aplicativo independente

## 🎨 Design

O design segue uma estética minimalista e elegante com:

- **Tipografia**: Instrument Serif para títulos, Inter para texto
- **Cor Principal**: #8B6F3A (tom ocre/duna)
- **Layout**: Centrado, focado em simplicidade e usabilidade

## 📄 Estrutura

```
cajueiro-fala/
├── app/
│   ├── page.tsx          # Tela principal (formulário)
│   ├── admin/
│   │   └── page.tsx      # Painel administrativo
│   ├── layout.tsx        # Layout base
│   └── globals.css       # Estilos globais
├── public/
│   ├── manifest.json     # Manifesto PWA
│   └── icon.svg          # Ícone do app
└── next.config.ts        # Configuração Next.js + PWA
```

## 🔧 Tecnologias

- **Next.js 15**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **next-pwa**: Funcionalidades PWA
- **localStorage**: Armazenamento local

## 📊 Painel Admin

Acesse `/admin` para visualizar:

- Total de comentários recebidos
- Lista completa de sugestões
- Busca por nome ou conteúdo
- Exportação para CSV
- Opção de limpar todos os dados

## 🌐 Deploy

Para fazer deploy em produção:

```bash
npm run build
npm start
```

Ou faça deploy na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/cajueiro-fala)

## 📝 Licença

Este projeto foi criado para a comunidade de Barra Grande (PI).

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
