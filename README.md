# Task Tracker - Backend

## Run locally

```bash
npm ci
npm run dev
```

## Routes available

- `POST /api/task` - create task
- `GET /api/task` - get all active and 10 completed tasks
- `GET /api/task?find=text` - get all active and 10 completed tasks that contain `text`
- `PATCH /api/task/:id` - set task as done or not done
- `DELETE /api/task` - delete all tasks
