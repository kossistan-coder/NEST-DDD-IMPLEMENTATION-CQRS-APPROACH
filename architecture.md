libs/
└── order/                          # @org/order
    └── src/
        ├── domain/                 # 100 % pur
        │   ├── entities/
        │   ├── value-objects/
        │   ├── ports/              # ← interfaces seulement
        │   ├── services/           # ← logique métier pure (@Injectable OK)
        │   └── domain.module.ts
        │
        ├── application/            # ← Use-cases = ce qui orchestre le domaine
        │   ├── commands/
        │   │   ├── create-order.command.ts
        │   │   └── create-order.handler.ts      # ← @CommandHandler()
        │   ├── queries/
        │   └── use-cases/                        # ← version sans CQRS
        │       └── place-order.use-case.ts       # ← @Injectable()
        │
        └── infrastructure/
            ├── persistence/
            │   ├── mongo/documents/
            │   └── postgres/entities/
            │
            ├── adapters/                      # ← TOUT ce qui parle à l’extérieur
            │   ├── stripe-payment.adapter.ts   # ← HttpService.post(...)
            │   ├── loyalty-http.adapter.ts
            │   ├── catalog-grpc.adapter.ts
            │   └── notification-kafka.adapter.ts
            │
            ├── clients/                       # ← clients générés (gRPC, GraphQL)
            │   └── catalog.grpc-client.ts
            │
            ├── services/                      # ← services « techniques » de la lib
            │   ├── email.service.ts           # ← envoie des mails via Resend/Sendgrid
            │   └── pdf-generator.service.ts
            │
            └── infrastructure.module.ts       # ← forRoot() qui fournit tout