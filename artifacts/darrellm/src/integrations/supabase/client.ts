// Supabase removed — using custom JWT API instead
// This stub prevents import errors in any remaining references
export const supabase = {
  from: () => ({ select: () => Promise.resolve({ data: [], error: null }), insert: () => Promise.resolve({ error: null }), update: () => ({ eq: () => Promise.resolve({ error: null }) }), delete: () => ({ eq: () => Promise.resolve({ error: null }) }), upsert: () => Promise.resolve({ error: null }) }),
  auth: { getSession: () => Promise.resolve({ data: { session: null }, error: null }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) },
};
