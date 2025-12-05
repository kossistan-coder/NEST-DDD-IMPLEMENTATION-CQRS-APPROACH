libs/
└── user/
    └── src/
        ├── domain/
        │   ├── entities/
        │   │   └── user.aggregate.ts          # ← User avec méthodes métier
        │   ├── value-objects/
        │   │   ├── email.vo.ts
        │   │   ├── password.vo.ts
        │   │   └── user-id.vo.ts
        │   ├── events/
        │   │   └── user-registered.event.ts
        │   └── exceptions/
        │       └── user-already-exists.exception.ts
        │
        ├── application/
        │   └── use-cases/
        │       ├── register-user.use-case.ts
        │       └── login-user.use-case.ts
        │
        └── infrastructure/
            ├── documents/
            │   └── user.document.ts               # ← @Schema()
            │
            ├── mappers/
            │   └── user.mapper.ts                 # ← toDomain() / toPersistence()
            │
            └── repositories/
                └── user.repository.ts             # ← TON CODE GAGNANT CI-DESSOUS



                       ┌───────────────────┐
       │   Client / App    │
       └─────────┬─────────┘
                 │ HTTP
                 ▼
       ┌───────────────────┐
       │      Krakend      │  ← API Gateway externe
       └─────────┬─────────┘
                 │ HTTP
                 ▼
       ┌───────────────────┐
       │ HTTP Gateway (BFF)│  ← Adaptateur HTTP → TCP
       └─────────┬─────────┘
                 │ TCP
 ┌───────────────┴───────────────┐
 │         Microservices          │
 │ ┌───────────────┐ ┌──────────┐│
 │ │ Users (TCP)   │ │ Payment  ││
 │ │ Port 3001     │ │ Port 3002││
 │ └───────────────┘ └──────────┘│
 └───────────────┬───────────────┘
                 │
                 ▼
           ┌───────────┐
           │ RabbitMQ  │  ← Event bus pour communication asynchrone
           └───────────┘
