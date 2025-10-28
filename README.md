# Notlify

Sistema de gestão de variações de custo e markup de itens - Parte do sistema Stock.

## 📋 Descrição

Notlify é um módulo completo para gerenciamento e notificação de variações de custo e insights de markup. O sistema permite entrada manual de dados ou upload de documentos PDF (NF-e ou espelho de lançamento) para extração automática de informações de itens.

## ✨ Funcionalidades

### Dashboard (/)
- Cards de resumo com métricas principais
- Tabela de itens atualizados recentemente
- Gráfico de linha mostrando tendência de custo dos top 5 itens por valor
- Botões de acesso rápido para upload e entrada manual

### Upload de Documentos (/upload)
- Zona de drag-and-drop para arquivos PDF
- Preview do documento selecionado
- Processamento mock de PDF com spinner
- Exibição de dados extraídos em tabela
- Botão para salvar dados processados

### Entrada Manual (/manual)
- Formulário para adicionar itens manualmente
- Cálculo automático de markup praticado
- Tabela com múltiplas linhas (adicionar/remover)
- Validação de campos obrigatórios

### Lista de Itens (/items)
- Busca por nome ou fornecedor
- Filtros por fornecedor e status
- Tabela com ordenação clicável
- Paginação (10 itens por página)
- Exportação para CSV

### Fornecedores (/suppliers)
- Cards com informações de cada fornecedor
- Métricas: total comprado, tempo médio de entrega
- Toggle de favorito
- Modal com detalhes completos
- Ordenação por favoritos e valor comprado

### Configurações (/settings)
- Toggle de tema (claro/escuro)
- Configuração de markup padrão
- Preferências de notificação (email e push)

## 🚀 Tecnologias

- **Framework:** Next.js 14+ com App Router
- **UI:** React 18+, TypeScript
- **Estilização:** Tailwind CSS (tema dark por padrão)
- **Gerenciamento de Tema:** next-themes
- **Gráficos:** Recharts
- **Ícones:** lucide-react
- **Upload:** react-dropzone
- **Datas:** date-fns
- **Database (stub):** Prisma + PostgreSQL

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm (gerenciador de pacotes)

### Passos

1. **Instalar dependências:**
```bash
pnpm install
```

2. **Gerar Prisma Client:**
```bash
pnpm prisma:generate
```

3. **Copiar arquivo de ambiente:**
```bash
cp .env.example .env
```

4. **Executar em desenvolvimento:**
```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5000`

## 📁 Estrutura do Projeto

```
notlify/
├── app/                      # Rotas do Next.js (App Router)
│   ├── api/
│   │   └── upload/          # API route para upload de PDF
│   ├── items/               # Página de lista de itens
│   ├── manual/              # Página de entrada manual
│   ├── settings/            # Página de configurações
│   ├── suppliers/           # Página de fornecedores
│   ├── upload/              # Página de upload
│   ├── ClientLayout.tsx     # Layout do cliente
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Dashboard (home)
├── components/              # Componentes reutilizáveis
│   ├── ChartLine.tsx       # Wrapper para gráficos Recharts
│   ├── DataTable.tsx       # Tabela com ordenação
│   ├── Header.tsx          # Cabeçalho
│   ├── ItemCard.tsx        # Card de métricas
│   ├── Sidebar.tsx         # Menu lateral
│   ├── ThemeToggle.tsx     # Toggle de tema
│   ├── Toast.tsx           # Notificações
│   └── UploadZone.tsx      # Zona de upload
├── lib/
│   └── mockData.ts         # Dados mock (20+ itens)
├── prisma/
│   └── schema.prisma       # Schema do banco (stub)
├── next.config.mjs         # Configuração Next.js
├── tailwind.config.ts      # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
└── package.json            # Dependências
```

## 🎨 Tema

O sistema possui suporte completo a tema claro/escuro:
- **Padrão:** Dark mode
- **Toggle:** Disponível no header (ícone de sol/lua)
- **Persistência:** localStorage (via next-themes)
- **Cor primária:** #00d4ff (azul ciano)

## 📊 Dados Mock

A aplicação utiliza dados mock definidos em `lib/mockData.ts`:
- **23 itens** com variações de custo realistas
- **10 fornecedores** com métricas completas
- **5 documentos** (NF-e e Espelho)

Funções auxiliares disponíveis:
- `getItensComAumentoCusto()` - Itens com variação > 10%
- `getItensComMarkupBaixo()` - Itens com markup abaixo do desejado
- `getItensRecentes(limite)` - Últimos itens atualizados
- `getTopItensParaGrafico()` - Top 5 itens por valor
- `exportToCSV(items, filename)` - Exportar para CSV

## 🗄️ Banco de Dados

O schema Prisma está configurado mas **não conectado a um banco real**. Todos os dados são mockados.

Para uso futuro com banco de dados:
1. Configure `DATABASE_URL` no arquivo `.env`
2. Execute as migrações: `pnpm prisma migrate dev`
3. Substitua os dados mock por queries reais do Prisma

## 📝 Scripts Disponíveis

```bash
pnpm dev              # Executar em desenvolvimento (porta 5000)
pnpm build            # Build para produção
pnpm start            # Executar build de produção
pnpm lint             # Executar linter
pnpm prisma:generate  # Gerar Prisma Client
```

## 🌐 Rotas

- `/` - Dashboard principal
- `/upload` - Upload de documentos PDF
- `/manual` - Entrada manual de itens
- `/items` - Lista completa de itens
- `/suppliers` - Gerenciamento de fornecedores
- `/settings` - Configurações do sistema
- `/api/upload` - Endpoint de processamento de PDF (mock)

## 🔐 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/notlify"
NEXT_PUBLIC_APP_NAME="Notlify"
NEXT_PUBLIC_DEFAULT_MARKUP=30
SESSION_SECRET="your-secret-key-here"
```

## 🎯 Próximos Passos (Roadmap)

1. **Parsing de PDF Real**
   - Implementar extração de dados de NF-e
   - Suporte para diferentes formatos de documento

2. **Banco de Dados**
   - Conectar PostgreSQL real
   - Implementar CRUD completo
   - Migrações de dados

3. **Autenticação**
   - Sistema de login
   - Gestão de usuários
   - Permissões por role

4. **Notificações**
   - Email automático para alertas
   - Push notifications no navegador
   - Configuração de thresholds personalizados

5. **Exportação Avançada**
   - Suporte para Excel
   - Relatórios em PDF
   - Importação de CSV

## 📄 Licença

Este projeto faz parte do sistema Stock.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Siga as convenções de código TypeScript
2. Mantenha a consistência de UI/UX
3. Atualize a documentação conforme necessário
4. Teste em modo claro e escuro

---

**Versão:** 1.0.0  
**Última atualização:** Outubro 2025
