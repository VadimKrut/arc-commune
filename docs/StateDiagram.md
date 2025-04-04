---
id: StateDiagram
title: IRS Execution State Diagram
sidebar_label: State Diagram
previous: IRCArchitecture
---

# 🔁 IRS Execution State Diagram — Поведение IRC во времени

Эта диаграмма отражает **динамическое поведение IRC-системы**, состоящей из модулей `IR` и `IS`.  
Здесь показано, какие состояния проходит каждый модуль во время одной итерации, как они взаимодействуют, и как происходит возврат к началу.

---

## 🔄 Диаграмма переходов между состояниями

```mermaid
stateDiagram-v2
    direction LR

    state IR {
        [*] --> IR_Check
        IR_Check --> IR_Read : байтов достаточно
        IR_Read --> IR_Prepare
        IR_Prepare --> SetPrepTrue : prep = true
        SetPrepTrue --> [*]
    }

    state IS {
        [*] --> IS_WaitSend
        IS_WaitSend --> IS_CheckPrep : prep == true
        IS_CheckPrep --> IS_Snapshot
        IS_Snapshot --> IS_ClearPrep : сброс prep = false
        IS_ClearPrep --> IS_TX
        IS_TX --> IS_ClearSend : send = false
        IS_ClearSend --> [*]
    }

    %% Межмодульное взаимодействие
    SetPrepTrue --> IS_CheckPrep : сигнал prep
    IS_ClearPrep --> IR_Check : сигнал IR
