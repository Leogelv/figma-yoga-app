"use client";

import { TelegramUser } from "../types/telegram";
import supabase from "./supabaseClient";

export interface UserData {
  id: string;
  telegram_id: string;
  telegram_username?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  photo_url?: string;
  avatar_url?: string;
  preferences?: any;
  [key: string]: any;
}

/**
 * Create or get a user in the Supabase database
 */
export const createOrGetUser = async (telegramUser: TelegramUser): Promise<UserData | null> => {
  try {
    if (!telegramUser.id) {
      throw new Error('Telegram user ID is required');
    }

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramUser.id.toString())
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(fetchError.message);
    }

    const now = new Date().toISOString();

    // If user exists, update last_login
    if (existingUser) {
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          username: telegramUser.username || existingUser.username,
          telegram_username: telegramUser.username || existingUser.telegram_username,
          first_name: telegramUser.firstName || existingUser.first_name,
          last_name: telegramUser.lastName || existingUser.last_name,
          last_login: now,
          updated_at: now,
        })
        .eq('telegram_id', telegramUser.id.toString())
        .select()
        .single();

      if (updateError) {
        throw new Error(`Error updating user: ${updateError.message}`);
      }

      return updatedUser;
    }

    // Create new user if not exists
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        telegram_id: telegramUser.id.toString(),
        telegram_username: telegramUser.username,
        username: telegramUser.username,
        first_name: telegramUser.firstName,
        last_name: telegramUser.lastName,
        created_at: now,
        updated_at: now,
        last_login: now,
        preferences: {},
      })
      .select()
      .single();

    if (createError) {
      throw new Error(`Error creating user: ${createError.message}`);
    }

    return newUser;
  } catch (error) {
    console.error('Error creating or getting user:', error);
    return null;
  }
};

/**
 * Update user data in the Supabase database
 */
export const updateUser = async (userId: string, userData: Partial<UserData>): Promise<UserData | null> => {
  try {
    // Update userData with current timestamp
    const updatedData = {
      ...userData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('users')
      .update(updatedData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

/**
 * Get user by Telegram ID
 */
export const getUserByTelegramId = async (telegramId: string | number): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId.toString())
      .single();

    if (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error getting user by Telegram ID:', error);
    return null;
  }
};

/**
 * Update user profile photo URL
 */
export const updateUserPhoto = async (userId: string, photoUrl: string): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        photo_url: photoUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating user photo: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error updating user photo:', error);
    return null;
  }
};

/**
 * Subscribe to realtime updates for a user
 * Returns a subscription that should be removed when no longer needed
 */
export const subscribeToUserUpdates = (
  userId: string,
  callback: (payload: UserData) => void
) => {
  const channel = supabase
    .channel(`user-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as UserData);
      }
    )
    .subscribe();

  // Return the channel for cleanup
  return channel;
};

/**
 * Remove a subscription to prevent memory leaks
 */
export const unsubscribeFromUserUpdates = (channel: any) => {
  if (channel) {
    supabase.removeChannel(channel);
  }
}; 