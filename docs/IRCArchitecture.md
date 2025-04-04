---
id: IRCArchitecture
title: IRC Architecture Diagram
sidebar_label: IRC Architecture
previous: IRS
---

# 🧱 IRC Architecture Diagram — Логическая структура IRS

Эта диаграмма отражает **внутреннюю архитектуру одного IRC (Instance Read-Send Capsule)**.  
Показывает, как устроены модули `IR` и `IS`, какие между ними связи, какие используются контракты и протоколы, и где находятся внешние входы и управляющие сигналы.

---

## 🧩 Архитектурная диаграмма компонентов IRC

```mermaid
flowchart TD
    %% Внешний поток
    Producer["🟢 Внешний источник (Java)"]
    RingBuffer["📥 Shared Memory (Ring Buffer)"]

    %% IRC капсула
    subgraph IRC ["🔒 IRC Capsule\nInstance Read–Send System"]
        direction LR

        %% IR
        subgraph IR [📘 IR: Instance Read]
            IR_Check["🔎 Проверка Protocol"]
            IR_Read["📥 Чтение Contract"]
            IR_Prepare["📦 Подготовка буфера A/B"]
            IR_FlagPrep["🔖 preparationIsOver = true"]
        end

        %% IS
        subgraph IS [📙 IS: Instance Send]
            IS_WaitSend["⏳ Ожидание send == true"]
            IS_CheckPrep["✅ Проверка prep == true"]
            IS_Snapshot["🧾 Захват snapshot"]
            IS_ClearPrep["❎ Сброс prep = false"]
            IS_TX["📤 Отправка через AF_XDP"]
            IS_ClearSend["❎ Сброс send = false"]
        end

        %% Internal Contracts/Protocols (вложены в систему)
        subgraph InternalRules [📜 Контракты и Протоколы]
            IR_Contract["📄 IR Contract"]
            IR_Protocol["📜 IR Protocol"]
            IS_Contract["📄 IS Contract"]
            IS_Protocol["📜 IS Protocol"]
        end

        IR_Contract --> IR_Read
        IR_Protocol --> IR_Check
        IS_Contract --> IS_Snapshot
        IS_Protocol --> IS_CheckPrep
    end

    Sync["🧭 Sync (send trigger)"]

    %% Движение данных
    Producer --> RingBuffer --> IR_Check
    IR_Check --> IR_Read --> IR_Prepare --> IR_FlagPrep
    IR_FlagPrep --> IS_CheckPrep
    Sync --> IS_WaitSend
    IS_WaitSend --> IS_CheckPrep --> IS_Snapshot
    IS_Snapshot --> IS_ClearPrep --> IS_TX --> IS_ClearSend
    IS_ClearPrep --> IR_Check
