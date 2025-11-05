import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uoamojdqdfznxcmulbqi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYW1vamRxZGZ6bnhjbXVsYnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMjEzODIsImV4cCI6MjA3Nzc5NzM4Mn0.oP3FUviP8HTMjo-lxL1CuaZViD2yb6CN2vg0Wg8JzbU";

export const supabase = createClient(supabaseUrl, supabaseKey);
