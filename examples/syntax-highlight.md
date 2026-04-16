# Syntax Highlighting Showcase

pretty-md renders 190+ languages with One Dark syntax highlighting.

---

## TypeScript

```typescript
interface User {
  id: number;
  name: string;
  role: 'admin' | 'viewer';
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<User>;
}
```

## Python

```python
from dataclasses import dataclass
from typing import Literal

@dataclass
class User:
    id: int
    name: str
    role: Literal["admin", "viewer"]

def greet(user: User) -> str:
    return f"Hello, {user.name}! You are a {user.role}."
```

## SQL

```sql
SELECT
  u.id,
  u.name,
  COUNT(o.id) AS total_orders,
  SUM(o.amount)  AS revenue
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
ORDER BY revenue DESC
LIMIT 10;
```

## Shell

```bash
#!/usr/bin/env bash
set -euo pipefail

VERSION=$(node -p "require('./package.json').version")
echo "Releasing v${VERSION}..."

git tag "v${VERSION}"
git push origin "v${VERSION}"
echo "Done — CI will publish to npm."
```

---

## Quick Reference

| Language   | Extension      | Supported |
|------------|----------------|-----------|
| TypeScript | `.ts`, `.tsx`  | ✅        |
| Python     | `.py`          | ✅        |
| SQL        | `.sql`         | ✅        |
| Rust       | `.rs`          | ✅        |
| Go         | `.go`          | ✅        |
| 185+ more  | —              | ✅        |
