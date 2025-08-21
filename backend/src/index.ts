import { PORT } from "./config/env.ts";
import app from "./app.ts";

app.listen(PORT || 3000);
