import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User} from '../interfaces'



@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) {

	}

	register() {}

	login(user: User): Observable<{token: string}> {
		return this.http.post<{token: string}>('/api/auth/login', user)
	}
	
}