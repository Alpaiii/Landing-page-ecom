import { supabase } from './supabase';

// Sign in admin
export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  // Verify user is admin
  if (data.user) {
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', data.user.id)
      .single();
    
    if (adminError || !adminData || adminData.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Unauthorized: Not an admin user');
    }
  }
  
  return data;
}

// Sign out admin
export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current admin session
export async function getAdminSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) throw error;
  if (!session) return null;
  
  // Verify admin role
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  if (!adminData || adminData.role !== 'admin') {
    return null;
  }
  
  return { session, admin: adminData };
}

// Check if user is authenticated admin (client-side)
export async function isAuthenticated() {
  const sessionData = await getAdminSession();
  return !!sessionData;
}
