<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function store(CreateUserRequest $request)
    {
        $ver_token = Str::random(120);
        $data = $request->except('password_confirmation', 'image');

        $data['password'] = Hash::make($data['password']);
        $data['role_id'] = Role::USER_ID;
        $imageName = time() . '.' . $request->file('image')->extension();
        $request->file('image')->storeAs('/uploads', $imageName);
        $data['image_path'] = $imageName;
        $data['verification_token'] = $ver_token;
        $newUser = User::create($data);
        if ($newUser) {
            $this->emailVerification($newUser, $ver_token);
            return response()->json([
                'message' => 'registered',
            ],200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong'
        ], 500);

    }

    public function emailVerification(User $user, $token)
    {
        Mail::send('mail.verify', ['user' => $user, 'token' => $token], function ($m) use ($user) {
            $m->from('yuro.bagdasaryan@bk.ru')->to($user->email, $user->name)->subject('Please Verify your Email');
        });
    }

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'authUser' => new UserResource($user),
            'message' => 'You are successfully logged in',
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = $this->guard()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token,\auth()->user());
    }

    public function emailVerify(Request $request)
    {
        $users_email = $request->only('email');

        $user_data = User::whereIn('email', $users_email)->first();

        $user_data['email_verified_at'] = Carbon::now();

        if ($user_data['email_verified_at']) {

            $user_data['verification_token'] = null;

            $user_data->update();

        }

        return response()->json($user_data);

    }


    public function guard()
    {
        return Auth::guard();
    }

    public function authuser()
    {
        return response()->json([
            'user_data' => new UserResource(\auth()->user()),
            'message' => 'Auth user'
        ]);
    }
    public function test()
    {
        return response()->json([
            'users' => User::all()
        ]);
    }

    /**
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->except('id'));
        return response()->json([
            'success' => true,
            'message' => 'User successdully updated'
        ], 200);
    }

}
