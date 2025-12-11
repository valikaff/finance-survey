# Настройка базы данных через API

Если не получается подключиться к БД через psql, используйте эти API эндпоинты:

## 1. Инициализация таблицы

```bash
curl -X POST https://finance-survey-v2-0.onrender.com/api/init-db
```

Должно вернуть: `{"success":true,"message":"Database initialized successfully"}`

## 2. Добавление доменов для шагов

Добавьте домены для каждого шага (1-6):

```bash
# Шаг 1
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 1, "domain": "https://finance-survey-v2-0.onrender.com", "active": true}'

# Шаг 2
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 2, "domain": "https://finance-survey-v2-0.onrender.com", "active": true}'

# Шаг 3
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 3, "domain": "https://finance-survey-v2-0.onrender.com", "active": true}'

# Шаг 4
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 4, "domain": "https://finance-survey-v2-0.onrender.com", "active": true}'

# Шаг 5
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 5, "domain": "https://finance-survey-v2-0.onrender.com", "active": true}'

# Шаг 6
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 6, "domain": "https://finance-survey-v2-0.onrender.com", "active": true}'
```

Если у вас есть второй домен, добавьте его тоже:

```bash
curl -X POST https://finance-survey-v2-0.onrender.com/api/add-domain \
  -H "Content-Type: application/json" \
  -d '{"step": 1, "domain": "https://your-second-domain.com", "active": true}'
```

## 3. Проверка добавленных доменов

```bash
# Все домены
curl https://finance-survey-v2-0.onrender.com/api/domains

# Домены для конкретного шага
curl https://finance-survey-v2-0.onrender.com/api/domains?step=1
```

## 4. Проверка работы API

```bash
# Получить домен для шага 1
curl https://finance-survey-v2-0.onrender.com/api/step-domain?step=1
```

Должно вернуть: `{"domain":"https://finance-survey-v2-0.onrender.com"}`

---

**Альтернатива:** Можно использовать Postman или любой другой HTTP клиент вместо curl.

