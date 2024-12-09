import { Component } from '@angular/core';
import {WebService} from '../app/web.service';
@Component({
  selector: 'test',
  standalone: true,
  providers: [WebService],
  templateUrl: './test.component.html'
})
export class TestComponent {
  test_output: string[] = [];
  token: any;

  creds = { username: 'TheRealHowardHamlin', password: 'hamlindigo'}
  registerUser = { name: 'TestUser', username: 'TestUser', email: 'test@email.com', password: 'testPass'}
  episodeId = '671158ec61e58bf0aa084615'
  triviaId = '6751cf1ab316ca28510ca2f1' //TODO: replace with existing for each run

  constructor(private webService: WebService) {}

  private testLogin() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.test_output.push(
        'Login... PASS')
    }, error => {
      this.test_output.push(
        'Login... FAIL'
      )
    })
  }

  private testGetEpisodes() {
    this.webService.getEpisodes()
      .subscribe( (response) => {
        let data = response['data'];
        if (Array.isArray(data) && data.length == 63)
          this.test_output.push(
            "Episodes fetched... PASS");
        else
          this.test_output.push(
            "Episodes fetched... FAIL");
      }, error => {
        this.test_output.push(
          "Episodes fetched... FAIL");
      });
  }

  private testGetTrivias() {
    this.webService.getTrivias(this.episodeId)
      .subscribe((response) => {
        if (Array.isArray(response))
          this.test_output.push(
            "Trivias fetched... PASS");
        else
          this.test_output.push(
            "Trivias fetched... FAIL");
        }, error => {
          this.test_output.push(
            "Trivias fetched... FAIL");
        })
  }

  private testPostTrivia() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.webService.postTrivia(
        this.episodeId,
        { trivia: 'myTrivia' },
        response.token
      ).subscribe((response) => {
        this.test_output.push(
          'PostTrivia... PASS'
        )
      }, error => {
        this.test_output.push(
          'PostTrivia... FAIL'
        )
      })
    }, error => {
      this.test_output.push(
        'PostTrivia... FAIL'
      )
    })
  }

  private testEditTrivia() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.webService.editTrivia(
        this.episodeId,
        this.triviaId,
        { trivia: 'myTrivia' },
        response.token
      ).subscribe((response) => {
        this.test_output.push(
          'EditTrivia... PASS'
        )
      }, error => {
        this.test_output.push(
          'EditTrivia... FAIL'
        )
      })
    }, error => {
      this.test_output.push(
        'EditTrivia... FAIL'
      )
    })
  }

  private testVoteTrivia() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.webService.voteTrivia(
        this.episodeId,
        this.triviaId,
        'up',
        response.token
      ).subscribe((response) => {
        this.test_output.push(
          'VoteTrivia... PASS'
        )
      }, error => {
        this.test_output.push(
          'VoteTrivia... FAIL'
        )
      })
    }, error => {
      this.test_output.push(
        'VoteTrivia... FAIL'
      )
    })
  }

  private testDeleteTrivia() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.webService.deleteTrivia(
        this.episodeId,
        this.triviaId,
        response.token
      ).subscribe((response) => {
        this.test_output.push(
          'DeleteTrivia... PASS'
        )
      }, error => {
        this.test_output.push(
          'DeleteTrivia... FAIL'
        )
      })
    }, error => {
      this.test_output.push(
        'DeleteTrivia... FAIL'
      )
    })
  }

  private testRegister() {
    this.webService.register(
      this.registerUser
    ).subscribe((response) => {
      this.test_output.push(
        'Register... PASS'
      )
    }, error => {
      this.test_output.push(
        'Register... FAIL'
      )
    })
  }

  private testBanUser() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.webService.ban('SlippinJimmy', response.token)
        .subscribe((response) => {
          this.test_output.push(
            'Ban... PASS'
          )
        }, error => {
          this.test_output.push(
            'Ban... FAIL'
          )
        })
    }, error => {
      this.test_output.push(
        'Ban... FAIL')
    });
  }

  private testLogout() {
    this.webService.login(
      this.creds
    ).subscribe((response) => {
      this.webService.logout(response.token)
        .subscribe((response) => {
          this.test_output.push(
            'Logout... PASS')
        }, error => {
          this.test_output.push(
            'Logout... FAIL'
          )
        })
    }, error => {
      this.test_output.push(
        'Logout... FAIL'
      )
    })
  }

  ngOnInit() {
    this.testLogin();
    this.testGetEpisodes();
    this.testGetTrivias();
    this.testPostTrivia();
    this.testEditTrivia();
    this.testVoteTrivia();
    this.testDeleteTrivia();
    this.testRegister();
    this.testBanUser();
    this.testLogout();
  }
}
